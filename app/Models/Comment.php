<?php

namespace App\Models;

use Database\Factories\CommentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comment extends Model
{
    use HasFactory;
    protected $appends = ['item_name']; // Makes it available in JSON

    public function getItemNameAttribute()
    {
        return $this->parent_category->name ?? null;
    }
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
  
    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
    protected static function newFactory()
    {
        return CommentFactory::new();
    }
}
