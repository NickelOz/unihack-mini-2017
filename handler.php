<?php
/**
 * Created by PhpStorm.
 * User: Draga
 * Date: 22/04/2017
 * Time: 7:06 PM
 */


$tempname = $_FILES['userfile']['tmp_name'];
$destination_dir = 'calendar_files';
$file_name = basename($_FILES['userfile']['name']);

move_uploaded_file($tempname, "$destination_dir/$file_name");

