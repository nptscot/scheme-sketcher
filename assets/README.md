`boundaries.geojson` was produced by:

- Downloading <https://github.com/nptscot/inputdata/blob/main/boundaries/la_regions_2023.geojson> (needs a login)
- Reducing coordinate precision: `mapshaper la_regions_2023.geojson -o precision=0.000001 boundaries.geojson`
