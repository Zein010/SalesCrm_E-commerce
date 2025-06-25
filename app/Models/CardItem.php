<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CardItem extends Model
{
    public function Card(): BelongsTo
    {
        return $this->belongsTo(Card::class);
    }
    public function Item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}
