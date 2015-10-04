---
layout: default
---
{{ content }}
<div>
<table>
<tr><th>File List</th></tr>
<?php

$files = glob('*');
usort($files, function($a, $b) {
        return filemtime($a) < filemtime($b);
});
$files = array_diff($files, array("index.php"));

foreach($files as $file){
    printf('<tr><td class="index-title"><a href="%2$s">%2$s</a></td></tr>',
        date('F d Y', filemtime($file)),
        basename($file));
}
?>
</table>
</div>
