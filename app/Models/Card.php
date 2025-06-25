<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Card extends Model
{
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
    public function cardItems(): HasMany
    {
        return $this->hasMany(CardItem::class);
    }
    //

}
