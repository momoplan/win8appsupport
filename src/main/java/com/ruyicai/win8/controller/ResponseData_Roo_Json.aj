// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ruyicai.win8.controller;

import com.ruyicai.win8.controller.ResponseData;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.lang.String;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect ResponseData_Roo_Json {
    
    public String ResponseData.toJson() {
        return new JSONSerializer().exclude("*.class").serialize(this);
    }
    
    public static ResponseData ResponseData.fromJsonToResponseData(String json) {
        return new JSONDeserializer<ResponseData>().use(null, ResponseData.class).deserialize(json);
    }
    
    public static String ResponseData.toJsonArray(Collection<ResponseData> collection) {
        return new JSONSerializer().exclude("*.class").serialize(collection);
    }
    
    public static Collection<ResponseData> ResponseData.fromJsonArrayToResponseDatas(String json) {
        return new JSONDeserializer<List<ResponseData>>().use(null, ArrayList.class).use("values", ResponseData.class).deserialize(json);
    }
    
}
