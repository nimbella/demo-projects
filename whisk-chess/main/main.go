package main

import (
	"runtime"

	"github.com/ChizhovVadim/CounterGo/engine"
	"github.com/ChizhovVadim/CounterGo/eval"
	"github.com/ChizhovVadim/CounterGo/uci"
)

/*
Counter Copyright (C) 2017-2020 Vadim Chizhov
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

func mkMap(key string, val interface{}) map[string]interface{} {
	res := make(map[string]interface{})
	res[key] = val
	return res
}

// play one move of the chess engine
func play(args map[string]interface{}) map[string]interface{} {
	var engine = engine.NewEngine(func() engine.Evaluator {
		return eval.NewEvaluationService()
	})

	var protocol = &uci.Protocol{
		Name:    "Counter",
		Author:  "Vadim Chizhov",
		Version: "v3.5",
		Engine:  engine,
		Options: []uci.Option{
			&uci.IntOption{Name: "Hash", Min: 4, Max: 1 << 16, Value: &engine.Hash},
			&uci.IntOption{Name: "Threads", Min: 1, Max: runtime.NumCPU(), Value: &engine.Threads},
			&uci.BoolOption{Name: "ExperimentSettings", Value: &engine.ExperimentSettings},
		},
	}

	res := make(map[string]interface{})

	time := "1000"
	fen := ""
	ok := true

	if t, ok := args["time"].(string); ok {
		time = t
	}

	fen, ok = args["fen"].(string)
	if ok {
		move, err := uci.Play(protocol, fen, time)
		if err != nil {
			res = mkMap("error", err.Error())
		} else {
			res = mkMap("move", move)
		}
	} else {
		res = mkMap("error", "fen is a required argument")
	}
	return res
}

// Main is the entry point of OpenWhisk
func Main(args map[string]interface{}) map[string]interface{} {

	method, _ := args["__ow_method"]
	switch method {
	case "get":
		return mkMap("body", indexHTML)
	case "post":
		return mkMap("body", play(args))
	default:
		return mkMap("error", "unknown method")
	}
}
