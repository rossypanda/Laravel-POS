<?php

namespace Database\Factories;

use App\Models\PurchaseOrder;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

class PoReportFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PurchaseOrder::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'po_reference'         => $this->faker->po_reference,
            'po_number'            => $this->faker->po_number,
            'date'                 => $this->faker->date,
            'supplier_id'          => $this->faker->supplier_id,
            'supplier_address'     => $this->faker->supplier_address,
            'payment_type'         => $this->faker->payment_type,
            'project_name'         => $this->faker->project_name,
            'requested_by'         => $this->faker->requested_by,
            'canvassed_by'         => $this->faker->canvassed_by,
            'approved_by'          => $this->faker->approved_by,
            'project_in_charge'    => $this->faker->project_in_charge,
            'purchaser'            => $this->faker->purchaser,
            'manager'              => $this->faker->manager,
            'bank'                 => $this->faker->bank,
            'contact_person'       => $this->faker->contact_person,
            'terms'                => $this->faker->terms,
            'total_amount'         => $this->faker->total_amount,
            'status'               => $this->faker->status,
            'encoded_by'           => $this->faker->encoded_by, 
        ];
    }

    
}

// $factory->define(App\PurchaseOrder::class, function (Faker $this->faker) {
//     return [
//         'title' => $this->faker->sentence(5),
//         'description' => $this->faker->realText(rand(80, 600)),
//         'release_date'  => $this->faker->date(),
//         'rating' => rand(1,5),
//         'genre_id' => function () {
//             // Get random genre id
//             return App\Genre::inRandomOrder()->first()->id;
//         },
//         'photo'  => 'https://via.placeholder.com/350x150',
//         'slug'   => str_replace('--', '-', strtolower(preg_replace('/[^a-zA-Z0-9]/', '-', trim($this->faker->sentence(5))))),
//     ];
// });
