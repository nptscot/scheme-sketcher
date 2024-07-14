#!/bin/bash
#
# This generates a route snapper file per LAD boundary. You'll need some dependencies:
#
# - wget, python3
# - osmium (https://osmcode.org/osmium-tool)
# - cargo (https://www.rust-lang.org/tools/install)
# - optionally pueue to parallelize (https://github.com/Nukesor/pueue)
#   - you can also modify the code to import each boundary sequentially

set -e

function split_osm {
        # Download Scotland OSM data
        if [ ! -f scotland-latest.osm.pbf ]; then
          wget http://download.geofabrik.de/europe/great-britain/scotland-latest.osm.pbf
        fi

        # Generate config for osmium
        mkdir osm
        cd osm
        mkdir out
        python3 ../geojson_to_osmium_extracts.py ../../assets/boundaries.geojson --output_dir=out/ --batch_size=10

        # Create an osm.pbf file per boundary
        for batch in osmium_cfg_*; do
          time osmium extract -v -c $batch ../scotland-latest.osm.pbf
        done
}

function build_route_snappers {
        # Build the route snapper tool
        cd route_snapper/osm-to-route-snapper
        cargo build --release
        cd ../../
        bin=./route_snapper/osm-to-route-snapper/target/release/osm-to-route-snapper

        # Generate a route snapper file for each boundary
        mkdir -p route-snappers
        IFS=$'\n'
        for osm in osm/out/*; do
          geojson=$(basename $osm .osm.pbf).geojson
          out=$(basename $osm .osm.pbf).bin
          task=$(pueue add --print-task-id --escape $bin --input "$osm" --boundary "osm/$geojson" --output "route-snappers/$out")
          pueue add --after $task --escape gzip "route-snappers/$out"
        done

        # Manually wait for pueue to finish
        # Then upload route-snappers/ somewhere and make sure content encoding is set to gzip
}

split_osm
build_route_snappers
