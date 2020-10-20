<?php

use Nimbella\Nimbella;
$kv = (new Nimbella())->redis();

function main(array $args): array {
  global $kv;
  $count = $kv->incr('page-visits');
  return [ 'body' => $count ];
}

