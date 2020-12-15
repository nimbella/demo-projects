using System;
using Newtonsoft.Json.Linq;
using MongoDB.Driver;
using MongoMusic.API.Models;

namespace MongoMusic.API
{
    public class GetAlbum
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
                string id = args["id"].ToString();
                var result =_albums.Find(album => album.Id == id).FirstOrDefault();
                // Console.WriteLine("Album found");

                if (result == null)
                {
                    returnValue.Add("statusCode", new JValue(404));
                    returnValue.Add("body", new JValue("Not found"));
                }
                else
                {
                    returnValue.Add("statusCode", new JValue(200));
                    returnValue.Add("body", new JValue(result)); // maybe
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
