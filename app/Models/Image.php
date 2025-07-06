<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    //
    protected $fillable = ["thumbnailed", "converted", "thumbnail_small", "thumbnail_medium", "user_id", "title", "width", "height", "file_path", "file_size", "file_name", "file_type", "caption", "alt_text"];
}
