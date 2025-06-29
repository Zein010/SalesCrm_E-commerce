<?php

namespace App\Models;

use Database\Factories\ClientFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Client extends Model
{

    use HasFactory;
    //
    protected $fillable = ["first_name", "last_name", "email", "username", "password", "phone"];
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
    public function card(): HasOne
    {
        return $this->hasOne(Card::class);
    }
    protected static function newFactory()
    {
        return ClientFactory::new();
    }
}
