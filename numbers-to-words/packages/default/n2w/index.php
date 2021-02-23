<?php
use NFNumberToWord\NumberToWords;
 
function main(array $args) : array
{
    if (!isset($args['number'])) {
        return wrap(['error' => 'Please supply a number.']);
    }
    
    $number = (int)($args['number']);
    $words = (new NumberToWords)->toWords($number);
 
    return [
        'body' => $words,
    ];
}

function wrap(array $args) : array
{
    return ["body" => $args];
}
