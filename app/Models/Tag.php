<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tag extends Model
{
    use HasFactory;
    protected $appends =  ["user_name"];
    protected $fillable = ["name", "description", "user_id"];
    public function getUserNameAttribute()

    {
        return $this->user->name ?? null;
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    //
}
