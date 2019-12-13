<?php

/**
 * A counter using the built-in key-value store.
 */

use Nimbella\Nimbella;

define('COUNTER', 'page-visits');
$redis = (new Nimbella())->redis();

function main() : array {
  global $redis;

  $count = $redis->incr(COUNTER);
  return [ 'body' => $count ];
}
