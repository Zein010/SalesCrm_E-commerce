<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;
    protected $appends = ['parent_category_name', "user_name"]; // Makes it available in JSON
    protected $fillable = ["name", "category_id", "description","user_id"];
    public function getParentCategoryNameAttribute()
    {
        return $this->parent->name ?? null;
    }

    public function getUserNameAttribute()
    {
        return $this->user->name ?? null;
    }
    public function items(): BelongsToMany
    {
        return $this->belongsToMany(Item::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }



    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, "category_id");
    }

    public function children(): HasMany
    {
        return $this->hasMany(Category::class, "id");
    }
    public function hasParent()
    {
        return !is_null($this->category_id);
    }

    public function hasChildren()
    {
        return $this->children()->exists();
    }
    //
}
