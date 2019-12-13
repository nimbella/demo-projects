<?php

/**
 * Checks if a file exists in the data bucket containing
 * and returns its contents. If not, creates the file and
 * initializes its contents. The contents are the date "since"
 * the project was deployed.
 */

use Nimbella\Nimbella;

define('FILENAME', 'visits-since.txt');

function main() : array {
  $bucket = (new Nimbella())->storage();
  $file   = $bucket->object(FILENAME);

  if ($file->exists()) {
    $since = $file->downloadAsString();
    return [ 'body' => $since ];
  } else {
    // info file doesn't exist, create it
    // and 'now' becomes the since date
    echo 'creating info file';
    $now = date('m/d/Y');
    $bucket->upload($now, [
      'name' => FILENAME
    ]);
    return [ 'body' => $now ];
  }
}
