using System;
using Newtonsoft.Json.Linq;
using MongoDB.Driver;
using MongoMusic.API.Models;

namespace MongoMusic.API
{
    public class CreateAlbum
    {
        private static MongoClient _mongoClient = null;
        private static IMongoCollection<Album> _albums = null;

        private void init(JObject args) {
            // We expect the args to contain the bound parameters (these are provided by the action
            // metadata and not by the end user)
            Console.WriteLine("init entered");
            if (_mongoClient == null) {
                var connectionString = args["MONGO_CONNECTION_STRING"].ToString();
                Console.WriteLine($"Initializing mongoClient with {connectionString}");
               _mongoClient = new MongoClient(connectionString);
            }
            if (_albums == null) {
                var dbName = args["DATABASE_NAME"].ToString();
                Console.WriteLine($"Resolving database name {dbName}");
                var database = _mongoClient.GetDatabase(dbName);
                var collectionName = args["COLLECTION_NAME"].ToString();
                Console.WriteLine($"Fetching collection {collectionName}");
                _albums = database.GetCollection<Album>(collectionName);
            }
        }

        private bool isValid(JObject args) {
            return args.ContainsKey("AlbumName") && args.ContainsKey("Artist") &&
                args.ContainsKey("Price") && args.ContainsKey("ReleaseDate") && args.ContainsKey("Genre");
        }

        public JObject Main(JObject args)
        {
            Console.WriteLine("Main entered");
            JObject returnValue = new JObject();
            
            try
            {
                if (isValid(args)) {
                    init(args);
                    Console.WriteLine("Initialized");
                    var album = new Album
                    {
                        AlbumName = args["AlbumName"].ToString(),
                        Artist = args["Artist"].ToString(),
                        Price = args["Price"].ToObject<Double>(),
                        ReleaseDate = DateTime.Parse(args["ReleaseDate"].ToString()),
                        Genre = args["Genre"].ToString()
                    };

                    Console.WriteLine("Album instance created");
                    _albums.InsertOne(album);
                    Console.WriteLine("Inserted");
                    returnValue.Add("statusCode", new JValue(200));
                    returnValue.Add("body", new JValue("Ok"));
                } else {
                    returnValue.Add("statusCode", new JValue(400));
                    returnValue.Add("body", new JValue("Invalid input.  AlbumName, Artist, Price, ReleaseDate, and Genre are required."));
                }
            }
            catch (Exception ex)
            {
                // Console.WriteLine("Exception caught");
                returnValue.Add("statusCode", new JValue(500));
                returnValue.Add("body", new JValue(ex.Message));
            }

            // Console.WriteLine("Returning");
            return returnValue;
        }
    }
}
