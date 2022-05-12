package org.example;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.hadoop.conf.Configuration;

import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SQLContext;

public class SparkImportJob {

    private static String serviceEndpoint = "https://s3.wasabisys.com";

    private static String accessKey = "4DLBUG7T3I4ZY30MY800";
    private static String secretKey = "RQ8Cdm4ZHhZstZTXl9CEYDzBnnzghtz2KVOGaL71";
    private static String bucketName="forecast";

    private String filename ;

    public SparkImportJob(String filename) {
        this.filename = filename;
    }

    public void run() {
        SparkConf sparkConf = new SparkConf()
                .setAppName("org.example.SparkImport")
                .setMaster("local[*]");

        JavaSparkContext sparkContext = new JavaSparkContext(sparkConf);
        var hadoopConfiguration = sparkContext.hadoopConfiguration();


        hadoopConfiguration.set("fs.s3a.endpoint", serviceEndpoint);
        hadoopConfiguration.set("fs.s3a.access.key", accessKey);
        hadoopConfiguration.set("fs.s3a.secret.key", secretKey);

        SQLContext sqlContext = new org.apache.spark.sql.SQLContext(sparkContext);

        Dataset<Row> dataset =  sqlContext.read().csv(String.format("s3a://%s/%s", bucketName, filename));
//        JavaRDD<String> myRDD = sparkContext.textFile(String.format("s3a://%s/%s", bucketName, filename));

//        myRDD.foreach(line -> {
//            String[] columns = line.split(",");
//
//        });

        dataset.show();
    }
}
