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

  $cookie = $args["__ow_headers"]["cookie"] ?? false;
  if ($cookie) {
      $count = $redis->get(COUNTER);
      return [
          'body' => $count
      ];
  } else {
      $uuid = Uuid::uuid4();
      $count = $redis->incr(COUNTER);
      return [
          'headers' => [
              'Set-Cookie' => 'UserID=' . $uuid->toString()
          ],
          'body' => $count
      ];
  }
}
