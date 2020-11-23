package qr;

import java.io.*;
import java.util.Base64;

import com.google.gson.JsonObject;

import com.google.zxing.*;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

public class Generate {
  public static JsonObject main(JsonObject args) throws Exception {
    String property = "text";
    String text = "Hello. Try with a 'text' value next time.";
    if (args.has(property)) {
      text = args.get(property).toString();
    }

    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    OutputStream b64os = Base64.getEncoder().wrap(baos);    

    BitMatrix matrix = new MultiFormatWriter().encode(text, BarcodeFormat.QR_CODE, 300, 300);
    MatrixToImageWriter.writeToStream(matrix, "png", b64os);
    b64os.close();

    String output = baos.toString("utf-8");

    JsonObject response = new JsonObject();
    JsonObject headers = new JsonObject();
    headers.addProperty("content-type", "text/html; charset=UTF-8");
    response.add("headers", headers);
    response.addProperty("body", "data:image/png;base64," + output);
    return response;
  }
}
