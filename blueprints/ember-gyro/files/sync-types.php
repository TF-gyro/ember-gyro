<?php
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
  $envVars = parse_ini_file($envFile);
  foreach ($envVars as $key => $value) {
    $_ENV[$key] = $value;
  }
} else {
  echo ".env file not found.";
  die(1);
}

if ($_ENV['TRIBE_API_URL']) {
  $ch = curl_init();

  curl_setopt($ch, CURLOPT_URL, "{$_ENV['TRIBE_API_URL']}/api.php/webapp/0");
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  $response = curl_exec($ch);

  // Check for errors
  if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
  }

  curl_close($ch);
}

$response = json_decode($response, true);
$types = $response['data']['attributes']['modules'] ?? null;

if (!$types) {
  echo "Failed to get types.json";
  die(1);
}

$commands = "[ -d 'app/models' ] && rm app/models -R; ";
$commands .= "[ -d 'tests/unit/models' ] && rm tests/unit/models -R; ";
$commands .= "mkdir app/models; ";

foreach (array_keys($types) as $type) {
  if (
    $type == 'webapp' ||
    in_array(
      $type,
      $types['webapp']['interface_urls'][basename(dirname(__FILE__))]['types'] ?? array_keys($types)
    )
  ) {
    $type_hyphen = str_replace('_', '-', $type);
    $type_ucwords = str_replace(' ', '', ucwords(str_replace('_', ' ', $type)));
    $commands .= "echo \"import Model, { attr } from '@ember-data/model'; export default class ".$type_ucwords."Model extends Model { @attr slug; @attr modules; }\" > app/models/".$type_hyphen.".js; ";
  }
}

exec($commands);
