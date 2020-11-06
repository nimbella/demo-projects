<?php

/**
 * Checks if a file exists in the data bucket containing
 * and returns its contents. If not, creates the file and
 * initializes its contents. The contents are the date "since"
 * the project was deployed.
 */

use Nimbella\Nimbella;

define('SINCE', 'visits-since');
$redis = (new Nimbella())->redis();
$since  = false; // locally cache the up date

function main() : array {
  global $redis, $since;

  if ($since) {
    // date is locally cached, use it
    return [ 'body' => $since ];
  } else {
    // since date doesn't exist, create it
    // and 'now' becomes the since date
    echo 'creating info record';
    $since = date('m/d/Y');
    if ($redis->setNx(SINCE, $since) == FALSE) {
      // record alread exists, use it
      $since = $redis->get(SINCE);
    }
    return [ 'body' => $since ];
  }
}
