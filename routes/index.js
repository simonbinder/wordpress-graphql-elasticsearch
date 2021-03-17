/* @flow */

var elasticsearch = require('elasticsearch');
var {graphql, ObjectTypeComposer, schemaComposer} = require('graphql-compose');
var {composeWithElastic, elasticApiFieldConfig} = require('graphql-compose-elasticsearch'); // from 'graphql-compose-elasticsearch';

const {GraphQLSchema, GraphQLObjectType} = graphql;

// Mapping obtained from ElasticSearch server.
const postMapping = {
    properties: {
        "author": {
            "type": "long"
        },
        "id": {
            "type": "long"
        },
        "categories": {
            "type": "long"
        },
        "comment_status": {
            "type": "text",
            "fields": {
                "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                }
            }
        },
        "custom_fields": {
            "properties": {
                "field": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "value": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                }
            }
        },
        "guid": {
            "type": "text",
            "fields": {
                "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                }
            }
        },
        "postContent": {
            "properties": {
                "attrs": {
                    "properties": {
                        "align": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "backgroundColor": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "backgroundType": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "block_id": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "classMigrate": {
                            "type": "boolean"
                        },
                        "className": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "level": {
                            "type": "long"
                        },
                        "providerNameSlug": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "type": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "url": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        }
                    }
                },
                "blockName": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "innerBlocks": {
                    "properties": {
                        "attrs": {
                            "properties": {
                                "align": {
                                    "type": "text",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "block_id": {
                                    "type": "text",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "classMigrate": {
                                    "type": "boolean"
                                },
                                "className": {
                                    "type": "text",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "id": {
                                    "type": "long"
                                }
                            }
                        },
                        "blockName": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "innerBlocks": {
                            "properties": {
                                "attrs": {
                                    "properties": {
                                        "className": {
                                            "type": "text",
                                            "fields": {
                                                "keyword": {
                                                    "type": "keyword",
                                                    "ignore_above": 256
                                                }
                                            }
                                        }
                                    }
                                },
                                "blockName": {
                                    "type": "text",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "innerContent": {
                                    "type": "text",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "innerHTML": {
                                    "type": "text",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                }
                            }
                        },
                        "innerContent": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "innerHTML": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        }
                    }
                },
                "innerContent": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "innerHTML": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                }
            }
        },
        "post_modified": {
            "type": "text",
            "fields": {
                "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                }
            }
        },
        "post_modified_gmt": {
            "type": "text",
            "fields": {
                "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                }
            }
        },
        "post_name": {
            "type": "text",
            "fields": {
                "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                }
            }
        },
        "post_parent": {
            "type": "long"
        },
        "post_status": {
            "type": "text",
            "fields": {
                "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                }
            }
        },
        "post_title": {
            "type": "text",
            "fields": {
                "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                }
            }
        },
        "post_type": {
            "type": "text",
            "fields": {
                "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                }
            }
        },
        "tags": {
            "type": "long"
        }
    },
};

const AuthorTC = schemaComposer.createObjectTC({
    name: 'Author',
    fields: {
        id: 'Int!',
        display_name: 'String',
        email: 'String',
        login: 'String',
    },
});

const CategoryTC = schemaComposer.createObjectTC({
    name: 'Category',
    fields: {
        id: 'Int!',
        name: 'String',
    },
});

const TagTC = schemaComposer.createObjectTC({
    name: 'Tag',
    fields: {
        id: 'Int!',
        name: 'String',
        slug: 'String'
    },
});

const CustomFieldTC = schemaComposer.createObjectTC({
    name: 'CustomField',
    fields: {
        field: 'String',
        value: 'String'
    },
});

const Issue = schemaComposer.createObjectTC({
    name: 'Issue',
    fields: {
        id: 'Int!',
        post_name: 'String',
        post_title: 'String',
        author: AuthorTC,
        postContent: 'JSON',
        categories: [CategoryTC],
        tags: [TagTC],
        guid: 'String',
        comment_status: 'String',
        post_modified: 'Date',
        post_modified_gmt: 'Date',
        post_parent: 'Int',
        post_status: 'String',
        post_type: 'String',
        custom_fields: [CustomFieldTC],
    },
});

const AttrsTC = schemaComposer.createObjectTC({
    name: 'Attrs',
    fields: {
        className: "String",
        backgroundColor: "String",
        backgroundType: "String",
        type: "String"
    }
})

const BlockTC = schemaComposer.createObjectTC({
    name: 'Block',
    fields: {
        blockName: 'String',
        innerHtml: 'String',
        attrs: AttrsTC,
        innerContent: "String"
    }
})

const PostTC = schemaComposer.createObjectTC({
    name: 'Post',
    fields: {
        id: 'Int!',
        post_name: 'String',
        post_title: 'String',
        author: AuthorTC,
        postContent: 'JSON',
        categories: [CategoryTC],
        tags: [TagTC],
        guid: 'String',
        comment_status: 'String',
        post_modified: 'Date',
        post_modified_gmt: 'Date',
        post_parent: 'Int',
        post_status: 'String',
        post_type: 'String',
        custom_fields: [CustomFieldTC],
        purpleIssue: Issue,
        purpleIssueArticles: [Issue]
    },
});

const elasticClient = new elasticsearch.Client({
    host: 'http://localhost:9200',
    apiVersion: '5.6',
});

const postTC = composeWithElastic({
    graphqlTypeName: 'WordpressPost',
    elasticIndex: 'wordpress_post',
    elasticType: '_doc',
    elasticMapping: postMapping,
    elasticClient: elasticClient,
    // elastic mapping does not contain information about is fields are arrays or not
    // so provide this information explicitly for obtaining correct types in GraphQL
    pluralFields: ['custom_fields', 'tags', 'categories', "postContent"],
});

const ProxyTC = ObjectTypeComposer.createTemp(`type ProxyDebugType { source: JSON }`);
ProxyTC.addResolver({
    name: 'showArgs',
    kind: 'query',
    args: {
        source: 'JSON',
    },
    type: 'ProxyDebugType',
    resolve: ({args}) => args,
});

PostTC.addResolver({
    name: 'article',
    kind: 'query',
    args: {
        id: 'JSON',
    },
    type: [PostTC],
    resolve: async ({args}) => {
        const posts = await elasticClient.search({
            index: 'wordpress_post',
        });
        const users = await elasticClient.search({
            index: 'wordpress_user',
        });
        const categories = await elasticClient.search({
            index: 'wordpress_category',
        });
        const tags = await elasticClient.search({
            index: 'wordpress_tag',
        });
        const filteredPosts = posts.hits.hits.filter( post => args.id ? parseInt(args.id, 10) === post._source.id : true );
        return filteredPosts.map(post => {
            const user = users.hits.hits.find(user => {
                return parseInt(user._source.id, 10) === post._source.author
            });
            post._source.author = user ? user._source : undefined;
            const categoriesFiltered = categories.hits.hits.filter(category =>
                post._source.categories ? post._source.categories.includes(category._source.id) : false);
            post._source.categories = categoriesFiltered.map(category => category._source);
            const tagsFiltered = tags.hits.hits.filter(tag =>
                post._source.tags ?  post._source.tags.includes(tag._source.id) : false);
            post._source.tags = tagsFiltered.map(tag => tag._source);
            const purpleIssueArticles = posts.hits.hits.filter(
                postIssues => post._source.purpleIssueArticles
                    ? post._source.purpleIssueArticles.includes(postIssues._source.id) && postIssues._source.post_type === 'post'
                    : false);
            const purpleIssue = posts.hits.hits.find(postIssue => postIssue._source.id === post._source.id);
            post._source.purpleIssueArticles = purpleIssueArticles.map(issue => issue._source);
            post._source.purpleIssue = purpleIssue;
            return post._source;
        })
    },
});

PostTC.addResolver({
    name: 'articles',
    kind: 'query',
    args: {
    },
    type: [PostTC],
    resolve: async ({args}) => {
        const posts =  await elasticClient.search({
            index: 'wordpress_post',
        });
        return posts.hits.hits.map( hit => hit._source);
    },
});

PostTC.addResolver({
    name: 'blockSearch',
    kind: 'query',
    args: {
        blockName: 'String',
    },
    type: [BlockTC],
    resolve: async ({args}) => {
        const posts = await elasticClient.search({
            index: 'wordpress_post',
            body: {query: {match: {"postContent.blockName": {query: args.blockName}}}}
        });
        // TODO
        const block = posts.hits.hits.find(post => {
            return post._source.postContent.some(block => block.blockName === args.blockName);
        });
        return block._source.postContent.filter(block => block.blockName === args.blockName);
    },
});


postTC.addRelation('showRelationArguments', {
    resolver: () => ProxyTC.getResolver('showArgs'),
    prepareArgs: {
        source: source => source,
    },
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            postSearch: postTC.getResolver('search').getFieldConfig(),
            postSearchPagination: postTC.getResolver('searchPagination').getFieldConfig(),
            userSearchConnection: postTC.getResolver('searchConnection').getFieldConfig(),
            article: PostTC.getResolver('article').getFieldConfig(),
            articles: PostTC.getResolver('articles').getFieldConfig(),
            blockSearch: PostTC.getResolver('blockSearch').getFieldConfig(),
            /*    elastic50: elasticApiFieldConfig({
                    host: 'http://localhost:9300',
                    apiVersion: '5.6',
                    log: 'trace',
                }),*/
        },
    }),
});

module.exports = schema;
