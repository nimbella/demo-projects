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

        public void init() {
            if (_mongoClient == null) 
               _mongoClient = new MongoClient(Environment.GetEnvironmentVariable("MONGO_CONNECTION_STRING"));
            if (_albums == null) {
                var database = _mongoClient.GetDatabase(Environment.GetEnvironmentVariable("DATABASE_NAME"));
                _albums = database.GetCollection<Album>(Environment.GetEnvironmentVariable("COLLECTION_NAME"));
            }
        }

        public JObject Main(JObject args)
        {
            // Console.WriteLine("Main entered");
            JObject returnValue = new JObject();

            try
            {
                init();
                // Console.WriteLine("Initialized");
                var album = new Album
                {
                    AlbumName = args["AlbumName"].ToString(),
                    Artist = args["Artist"].ToString(),
                    Price = args["Price"].ToObject<Double>(),
                    ReleaseDate = args["ReleaseDate"].ToObject<DateTime>(),
                    Genre = args["Genre"].ToString()
                };

                // Console.WriteLine("Album instance created");
                _albums.InsertOne(album);
                // Console.WriteLine("Inserted");
                returnValue.Add("statusCode", new JValue(200));
                returnValue.Add("body", new JValue("Ok"));
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
