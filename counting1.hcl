service {
  name = "counting"
  id = "counting-1"
  port = 9003

  connect {
    sidecar_service {}
  }

  check {
    id       = "counting1-check"
    http     = "https://localhost:9003/healthcheck"
    tlsskipverify = true
    method   = "GET"
    interval = "15s"
    timeout  = "1s"
  }
}

