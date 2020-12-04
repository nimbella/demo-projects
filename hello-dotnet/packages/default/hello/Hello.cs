using System;
using Newtonsoft.Json.Linq;

namespace Apache.OpenWhisk.Example.Dotnet
{
    public class Hello
    {
        public JObject Main(JObject args)
        {
            string name = "stranger";
            if (args.ContainsKey("name")) {
                name = args["name"].ToString();
            }
            JObject message = new JObject();
            message.Add("greeting", new JValue($"Hello, {name}!"));
            return (message);
        }
    }
}
