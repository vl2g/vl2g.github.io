## COFAR Dataset Images 
COFAR dataset comprises of images obtained from few sources (publicly available datasets, and web sources). The images belong to Brand, Celeb or Landmark categories.

---

## Download images of COFAR dataset

Download the Text-KVQA dataset images [here](http://dosa.cds.iisc.ac.in/kvqa/text-KVQA-scene.tar.gz) and Celebrity in Places dataset images [here](https://www.robots.ox.ac.uk/~vgg/data/celebrity_in_places/).

To obtain the images, please download the `cofar_images.zip` file, which contains `cofar_brand_images.json`, `cofar_celeb_images.json`, and `cofar_landmark_images.json`. 

Each of these JSON files contains image IDs of COFAR and their respective URLs or data paths to other datasets. E.g:

```json
{
    "L110209_4.jpg": {
        "source": "google_landmarks_dataset",
        "link": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Nesodden_kirke_IMG_2359_rk_85123.JPG",
    },
}
```

Here the image ID is `L110209_4` and its URL is provided for download.

```json
{
    "Q1619375_4.jpg": {
        "source": "text_kvqa",
        "link": "./text-KVQA-scene/images/Q1619375/Q1619375_4.jpg"
    },
}
```

Here the image ID is `Q1619375_4` and its source is the text-KVQA dataset.

---

## Annotations for COFAR Images

We provide human annotated textual search queries for the images of COFAR. These can be found in the `cofar_train.json` file as well as the test files `test_unified.zip`, `test_brand.zip`, `test_celebrities.zip`, and `test_landmarks.zip` files available on the COFAR project page.

The organization of the annotation files are as follows:

```json
{
    "Q634881_20": [
        "DIfferent types of clothes were on display table at apparel store that sells clothing",
        "Girl white dress is present in the display of apparel store",
        "Variety suits with different designs upto 50% discount in apparel store"
    ],
    ...
}
```

Here `Q578832_10` is the image ID which contains three annotated search queries.