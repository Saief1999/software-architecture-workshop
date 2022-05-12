## Whole architecture candidate


We will have 2 UI's

1 -> To add new Data ( from a CSV file for example , or simply by hand ) save it in a mongodb 

2 -> move them to a Redis db (To Redis From)

3 -> Launch your prediction model on the new Data, and save the results in a DB (maybe same , maybe another)

4 -> In the final UI we can search ( products/stores ) and we can show predictions


Note : it's unecessary to return the product id and the store id with each prediction

Note2 : We can save predictions and data on separate databases ( or collections ) so we can compare them later on

---

first : import some csv ( list of products /)


---

If there's an issue with kafka , we just need to recreate the topic , this will clear the last session ( you can also test with kafka-producer and kafka-consumer )


to launch spark job for import 

```
spark-submit --class org.example.SparkImport --master local[2] spark-import-1.0-SNAPSHOT-jar-with-dependencies.jar dataset.csv
```

---

Spark MLLIB : 

instead of working with RDD's , we will be working we dataframes ( we can get them from RDDS )

Transformers : transform Dataframes to other dataframes  **( eg. input , given to a model,to prediction )** - , 
a model is a transformer

Estimator : implements **fit** which accepts a Dataframes and produces a model ( training )



## Pipeline

In machine learning, it is common to run a sequence of algorithms to process and learn from data. E.g., a simple text document processing workflow might include several stages:

- Split each document’s text into words.
- Convert each document’s words into a numerical feature vector.
- Learn a prediction model using the feature vectors and labels.

MLlib represents such a workflow as a `Pipeline`, which consists of a sequence of `PipelineStage`s (`Transformer`s and `Estimator`s) to be run in a specific order. We will use this simple workflow as a running example in this section

### How it works

![](https://spark.apache.org/docs/2.3.0/img/ml-Pipeline.png)

Above, the top row represents a `Pipeline` with three stages. The first two (`Tokenizer` and `HashingTF`) are `Transformer`s (blue), and the third (`LogisticRegression`) is an `Estimator` (red). The bottom row represents data flowing through the pipeline, where cylinders indicate `DataFrame`s. The `Pipeline.fit()` method is called on the original `DataFrame`, which has raw text documents and labels. The `Tokenizer.transform()` method splits the raw text documents into words, adding a new column with words to the `DataFrame`. The `HashingTF.transform()` method converts the words column into feature vectors, adding a new column with those vectors to the `DataFrame`. Now, since `LogisticRegression` is an `Estimator`, the `Pipeline` first calls `LogisticRegression.fit()` to produce a `LogisticRegressionModel`. If the `Pipeline` had more `Estimator`s, it would call the `LogisticRegressionModel`’s `transform()` method on the `DataFrame` before passing the `DataFrame` to the next stage.

A `Pipeline` is an `Estimator`. Thus, after a `Pipeline`’s `fit()` method runs, it produces a `PipelineModel`, which is a `Transformer`. This `PipelineModel` is used at *test time*; the figure below illustrates this usage.

  ![ML PipelineModel Example](https://spark.apache.org/docs/2.3.0/img/ml-PipelineModel.png)

In the figure above, the `PipelineModel` has the same number of stages as the original `Pipeline`, but all `Estimator`s in the original `Pipeline` have become `Transformer`s. When the `PipelineModel`’s `transform()` method is called on a test dataset, the data are passed through the fitted pipeline in order. Each stage’s `transform()` method updates the dataset and passes it to the next stage.

`Pipeline`s and `PipelineModel`s help to ensure that training and test data go through identical feature processing steps.



## Parameters

MLlib `Estimator`s and `Transformer`s use a uniform API for specifying parameters.

A `Param` is a named parameter with self-contained documentation. A `ParamMap` is a set of (parameter, value) pairs.

There are two main ways to pass parameters to an algorithm:

1. Set parameters for an instance.  E.g., if `lr` is an instance of `LogisticRegression`, one could call `lr.setMaxIter(10)` to make `lr.fit()` use at most 10 iterations. This API resembles the API used in `spark.mllib` package.
2. Pass a `ParamMap` to `fit()` or `transform()`.  Any parameters in the `ParamMap` will override parameters previously specified via setter methods.

Parameters belong to specific instances of `Estimator`s and `Transformer`s. For example, if we have two `LogisticRegression` instances `lr1` and `lr2`, then we can build a `ParamMap` with both `maxIter` parameters specified: `ParamMap(lr1.maxIter -> 10, lr2.maxIter -> 20)`. This is useful if there are two algorithms with the `maxIter` parameter in a `Pipeline`.

## ML persistence: Saving and Loading Pipelines

Often times it is worth it to save a model or a pipeline to disk for  later use. In Spark 1.6, a model import/export functionality was added  to the Pipeline API. As of Spark 2.3, the DataFrame-based API in `spark.ml` and `pyspark.ml` has complete coverage


---

mois - annees - productid - storeid -> reduce (sum of the quantity)

then -> determine best for each month / product
