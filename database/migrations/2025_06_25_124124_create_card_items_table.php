<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('card_items', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer("card_id");
            $table->integer("item_id");
            $table->index("item_id");
            $table->index("card_id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('card_items');
    }
};
