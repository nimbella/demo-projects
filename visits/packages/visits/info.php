<?php

/**
 * Checks if a file exists in the data bucket containing
 * and returns its contents. If not, creates the file and
 * initializes its contents. The contents are the date "since"
 * the project was deployed.
 */

use Nimbella\Nimbella;

define('FILENAME', 'visits-since.txt');
$bucket = (new Nimbella())->storage();
$file   = $bucket->object(FILENAME);
$since  = false; // locally cache the up date

function main() : array {
  global $since, $bucket, $file;

  if ($since) {
    // date is locally cached, use it
    return [ 'body' => $since ];
  } else if ($file->exists()) {
    // fetch the date from the object store
    // and cache it for future use
    $since = $file->downloadAsString();
    return [ 'body' => $since ];
  } else {
    // date file doesn't exist, create it
    // and 'now' becomes the since date
    echo 'creating info file';
    $since = date('m/d/Y');
    $bucket->upload($since, [
      'name' => FILENAME
    ]);
    return [ 'body' => $since ];
  }
}
