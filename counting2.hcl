service {
  name = "counting"
  id = "counting-2"
  port = 9004

  connect {
    sidecar_service {}
  }

  check {
    id       = "counting2-check"
    http     = "https://localhost:9004/healthcheck"
    tlsskipverify = true
    method   = "GET"
    interval = "15s"
    timeout  = "1s"
  }
}

