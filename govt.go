package main

import (
	"crypto/hmac"
	"crypto/sha1"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
)

var apiKey = []byte("c2799f9d4f593eb7d77f2ccf6a509521")
var apiSecret = []byte("da999252e5b90e7dee0e69a735ec23df")

type stopDetailsResponse struct {
	Status   string
	Response []struct {
		Name      string  `json:"stop_name"`
		Latitude  float64 `json:"stop_lat"`
		Longitude float64 `json:"stop_lon"`
		Code      string  `json:"stop_code"`
	}
}

type StopDetails struct {
	Name      string
	Latitude  float64
	Longitude float64
	Code      string
}

func stopDetails(stop string) (*StopDetails, error) {
	mac := hmac.New(sha1.New, apiSecret)
	mac.Write([]byte(fmt.Sprintf("%d", timeDrift()) + string(apiKey)))
	signature := mac.Sum(nil)

	params := &url.Values{}
	params.Set("api_key", string(apiKey))
	params.Set("api_sig", fmt.Sprintf("%x", signature))

	url := fmt.Sprintf("https://api.at.govt.nz/v1/gtfs/stops/stopCode/%s?%s", stop, params.Encode())

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}

	body := &stopDetailsResponse{}
	if err := json.NewDecoder(resp.Body).Decode(body); err != nil {
		return nil, err
	}

	stopDetails := &StopDetails{}
	stopDetails.Name = body.Response[0].Name
	stopDetails.Latitude = body.Response[0].Latitude
	stopDetails.Longitude = body.Response[0].Longitude
	stopDetails.Code = body.Response[0].Code

	return stopDetails, nil
}

type epochResponse struct {
	Status   string
	Response struct {
		Type string
		Time int64
	}
}

func timeDrift() int64 {
	// Create request
	req, err := http.NewRequest("GET", "https://api.at.govt.nz/v1/time/epoch?api_key=a471a096baaa08c893f48a909d0ae3d3", nil)

	// Fetch Request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return 0
	}
	defer resp.Body.Close()

	body := &epochResponse{}
	json.NewDecoder(resp.Body).Decode(body)

	return body.Response.Time
}
