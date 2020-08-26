<?php

/**
 * A counter using the built-in key-value store.
 */

use Nimbella\Nimbella;
use Ramsey\Uuid\Uuid;

define('COUNTER', 'page-visits');
$redis = (new Nimbella())->redis();

function main(array $args) : array {
  global $redis;

  $uuid = Uuid::uuid4();
  $count = $redis->incr(COUNTER);
  return [
      'headers' => [
          'Set-Cookie' => 'VisitID=' . $uuid->toString()
      ],
      'body' => $count
  ];
}
