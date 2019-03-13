# Checking health of kibana
GET /_cat/health?v

# Checking indices
GET /_cat/indices?v

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

# Example HOw to insert
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



