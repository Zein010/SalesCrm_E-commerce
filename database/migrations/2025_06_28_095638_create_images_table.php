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
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            // Automatic Fields
            $table->string("file_name");
            $table->string("file_path");
            $table->string("file_type");
            $table->integer("file_size");
            $table->decimal("width", 7, 2);
            $table->decimal("height", 7, 2);

            // SEO Fields

            $table->string("title")->nullable();
            $table->string("alt_text")->nullable();
            $table->string("caption")->nullable();


            // Performance Feilds
            $table->string("thumbnail_medium")->nullable();
            $table->string("thumbnail_small")->nullable();
            $table->boolean("thumbnailed")->default(false);
            $table->boolean("converted")->default(false);
            // Tracking Fields
            $table->integer("user_id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
