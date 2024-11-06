<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormAnswer extends Model
{
    use HasFactory;

    protected $table = 'form_answers';


    public function form()
    {
        return $this->belongsTo(Form::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function fields()
    {
        return $this->belongsToMany(FormField::class, 'form_field_answers', 'form_answer_id', 'field_id')
            ->using(FormFieldAnswer::class)
            ->withPivot('value');
    }
}
