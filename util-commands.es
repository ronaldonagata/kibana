#  Elastic characteristics
#    Comes from Lucene
#    Search Engine
#    Uses REST API, (HEAD, PUT, POST, GET, DELETE)
#    JSON format
#    Horizontal scalability
#    Run in cloud
#    Aggregation operations and geospaces searches 


# Relational Database   -->    ElasticSearch
# instance              -->    index     
# table                 -->    type
# schema                -->    mapping
# tuple                 -->    document
# column                -->    attribute    


# Shards -> Partioning the data
# Primary Shards -> The write process occurs first here (create, update and remotion)
# Secondary Chards -> The write is replicated at secondary chards
# Lots of chards will gain in write process, on the other hand it can slow down the read process. 
# It is not good to have more than 50 GB per shard 
# The number of shards is defined when the index is created, and it can't be changed after that.
# The number of replicas is defined at the index creation, but it can be changed after. 

# With GET, HEAD and put it is oligated to use and id
# If you don't provide what is the version you want, el will return the last version
# If you don't provide the id in POST request, the id will be auto-incremented
# If you provide the document id, it will create or update partially the document
#   Ex: POST /<index>/<type>/<id>/_update
# The PUT command will overwrithe the whole document

# Checking health of kibana
GET /<index>/health?v

# Checking indices
GET /<index>/indices?v

# Set number of replicas of an indice
PUT /<index>/_settings
{
  "index":{
    "number_of_replicas" : 0
  }
}

#Get the number of documents
GET /<index>/<type>/_count

#Get the Element with this unique identifier 
GET /<index>/<type>/<identifier>

#Get all documents
GET /<index>/<type>/_search

#Simple search
GET /<index>/<type>/_search?q=<term>

#Simple search imposing a limit to number of elements
GET /<index>/<type>/_search?q=<term>&size=<numberofelements>

#Simple search imposing a limit to number of elements, using pagination.
GET /<index>/<type>/_search?q=<term>&size=<numberofelements>&from=<position>

# GET with all attribute
GET /<index>/<type>/_search?q=_all:<something>

# Simple get wchich return juts the attributes you want
GET /<index>/<type>/<id>?pretty&_source=<attribute>


# Meaning of result body
# took --> Time to execute the search i miliseconds
# time_out --> If the search reach the time limit
# _shards.total --> Number of shards that the search lookd format
# _shards.successful -> Number of shards which successully complete the search
# _shards.failed --> Number of shards which failed during the search process
# hits.total --> Number of documents found.
# hits.max_score -->  Value between 0 and 1, represents how much the match with the document with term searched. 1 is perfect match 
# hits.hits --> All the documents found.






########### Analysers generate the tokens
# White Space -> Elminate blank space 
# Simple -> Only letters, to lowercase
# Standard -> No sapce, no points accents
# Idiom -> it is specific for each language


# Verify if the document exists
HEAD /<index>/<type>/<id>

# Delete a document 
DELETE /<index>/<type>/<id>

# Update a document
POST /<index>/<type>/<id>/_update


# Set number of replicas to zero  when workin with single node
PUT /products
{
  "settings": {
    "index": {
      "number_of_shards": 3,
      "number_of_replicas": 0
    }
  },
  "mappings": {
    "apparel": {
      "_all": {
        "type": "text",
        "analyzer": "portuguese"
      },
      "properties": {
        "nome": {
          "fields": {
            "original": {
              "type": "keyword"
            }
          },
          "type": "text",
          "analyzer": "portuguese"
        },
        "category": {
          "fields": {
            "original": {
              "type": "keyword"
            }
          },
          "type": "text",
          "analyzer": "portuguese"
        },
        "subcategory": {
          "fields": {
            "original": {
              "type": "keyword"
            }
          },
          "type": "text",
          "analyzer": "portuguese"
        },
        "tags": {
          "fields": {
            "original": {
              "type": "keyword"
            }
          },
          "type": "text",
          "index": "true",
          "analyzer": "portuguese"
        },
        "supplier": {
          "fields": {
            "original": {
              "type": "keyword",
              "index": "false"
            }
          },
          "type": "text"
        },
        "price": {
          "type": "float"
        }
      }
    }
  }
}

# Example How to insert
POST /products/apparel
{
  "name": "Hello World",
  "category": "Boss",
  "subcategory": "Master",
  "tags": ["eletronic", "digital"],
  "suplier": "amazon",
  "price": 19.99
}

#Search to be executed in discover tab in kibana
# categoria:(calçados OR roupas)
# tags:(computacao futebol)
# tags:impresso AND nome:scala

#Filter doesn't have an score, can be cached, can be defined an order
### Query ADSL

# Search all products
GET /products/apparel/_search
{
    "query":
    {
        "match_all":{}
    }
}

#Search by specified field, it searchs just in analysed fields
GET /produtos/v1/_search
{
  "query":
  {
    "match": {
      "category": "Boss"
    }
  }
}

# This is equivalent to tags:impresso AND nome:scala
GET /produtos/v1/_search
{
  "query":{
    "bool": {
      "must": [
        {"match": {"tags": "digital"}},
        {"match": {"name": "Hello"}}
      ]
    }
  }
}



