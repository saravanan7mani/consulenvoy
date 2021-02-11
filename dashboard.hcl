service {
  name = "dashboard"
  port = 9002

  connect {
    sidecar_service {
      proxy {
        upstreams = [
          {
            destination_name = "counting"
            local_bind_port  = 5000
          }
        ]
      }
    }
  }

  check {
    id       = "dashboard-check"
    http     = "https://localhost:9002/healthcheck"
    tlsskipverify = true
    method   = "GET"
    interval = "5s"
    timeout  = "1s"
  }
}

