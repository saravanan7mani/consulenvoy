Kind           = "service-resolver"
Name           = "counting"
LoadBalancer = {
  Policy = "maglev"
  HashPolicies = [
     {
        Field = "cookie"
        FieldValue = "cookie-x-user-id"
        CookieConfig = {
           TTL = "120s"
           Path = "/"
        }
     }
  ]
}
