## WikiLandmarks Dataset

The downloadable WikiLandmarks dataset is divided into four zip files. 

```bash
.
├── [138G]  wikilandmarks_dataset.zip
├── [200G]  wikilandmarks_dataset.z01
├── [200G]  wikilandmarks_dataset.z02
└── [200G]  wikilandmarks_dataset.z03 
```

Once downloaded, do the following:
1. Combine the split zip files into a single file.
```bash
$ zip -F wikilandmarks_dataset.zip --out single-archive.zip
```

2. Extract the single zip file.
```bash
$ unzip single-archive.zip
```