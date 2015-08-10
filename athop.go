package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"
	"strconv"
	"time"
)

func requestStopInfo(stop string) ([]Movement, error) {
	url := fmt.Sprintf("http://api.maxx.co.nz/RealTime/v2/Departures/Stop/%s?hours=2", stop)

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body := &Response{}
	if err := json.NewDecoder(resp.Body).Decode(body); err != nil {
		return nil, err
	}

	return body.Movements, nil
}

type Response struct {
	Movements []Movement
}

type Movement struct {
	ActualArrivalTime         TimeStamp
	ActualDepartureTime       TimeStamp
	ArrivalBoardingActivity   string
	ArrivalPlatformName       string
	ArrivalStatus             string
	DepartureBoardingActivity string
	DeparturePlatformName     string
	DestinationDisplay        string
	ExpectedArrivalTime       TimeStamp
	ExpectedDepartureTime     TimeStamp
	InCongestion              bool
	Monitored                 bool
	Route                     string
	Stop                      string
	TimeStamp                 TimeStamp
	VehicleJourneyName        string
}

func (m Movement) Countdown() int {
	var t time.Time

	if time.Time(m.ExpectedDepartureTime).IsZero() {
		t = time.Time(m.ActualDepartureTime)
	} else {
		t = time.Time(m.ExpectedDepartureTime)
	}

	d := t.Sub(time.Time(m.TimeStamp))
	return int(d.Seconds())
}

var dateRegexp = regexp.MustCompile(`^"\\\/Date\((\d+)\)\\\/"$`)

type TimeStamp time.Time

func (t TimeStamp) MarshalJSON() ([]byte, error) {
	if time.Time(t).IsZero() {
		return []byte("0"), nil
	}
	return []byte(fmt.Sprintf("%d000", time.Time(t).Unix())), nil
}

func (t *TimeStamp) UnmarshalJSON(data []byte) error {

	matches := dateRegexp.FindSubmatch(data)
	if len(matches) > 1 {
		timestamp, err := strconv.ParseInt(string(matches[1]), 10, 64)
		if err != nil {
			return err
		}
		*t = TimeStamp(time.Unix(timestamp/1000, 0))
	}

	return nil
}
