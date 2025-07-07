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
        Schema::create('cards', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer("client_id");
            $table->decimal("p_subtotal", 20, 3);
            $table->decimal("p_discount", 20, 3);
            $table->decimal("p_tax", 20, 3);
            $table->decimal("p_final", 20, 3);
            $table->index("client_id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cards');
    }
};
