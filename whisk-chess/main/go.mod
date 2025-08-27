module github.com/openwhisk-blog/whisk-chess

go 1.15

replace github.com/ChizhovVadim/CounterGo/engine => ./engine

replace github.com/ChizhovVadim/CounterGo/eval => ./eval

replace github.com/ChizhovVadim/CounterGo/uci => ./uci

replace github.com/ChizhovVadim/CounterGo/common => ./common

require (
	github.com/ChizhovVadim/CounterGo/engine v0.0.0-00010101000000-000000000000
	github.com/ChizhovVadim/CounterGo/eval v0.0.0-00010101000000-000000000000
	github.com/ChizhovVadim/CounterGo/uci v0.0.0-00010101000000-000000000000
)
