<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\Retailer;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TenantIsolationTest extends TestCase
{
    use RefreshDatabase;

    private function makeUser(Tenant $tenant, string $email): User
    {
        return User::create([
            'tenant_id' => $tenant->id,
            'name' => 'Test Owner',
            'email' => $email,
            'phone' => '0700000000',
            'password' => 'password',
        ]);
    }

    public function test_a_tenant_cannot_view_another_tenants_product(): void
    {
        $tenantA = Tenant::create(['name' => 'Tenant A', 'phone' => '111']);
        $tenantB = Tenant::create(['name' => 'Tenant B', 'phone' => '222']);
        $userA = $this->makeUser($tenantA, 'a@example.com');

        $productB = Product::create([
            'tenant_id' => $tenantB->id,
            'name' => 'Secret Product',
            'cost_price' => 10,
            'sale_price' => 20,
            'stock_qty' => 5,
        ]);

        $this->actingAs($userA)
            ->getJson("/api/products/{$productB->id}")
            ->assertStatus(404);
    }

    public function test_a_tenant_cannot_update_or_delete_another_tenants_product(): void
    {
        $tenantA = Tenant::create(['name' => 'Tenant A', 'phone' => '111']);
        $tenantB = Tenant::create(['name' => 'Tenant B', 'phone' => '222']);
        $userA = $this->makeUser($tenantA, 'a@example.com');

        $productB = Product::create([
            'tenant_id' => $tenantB->id,
            'name' => 'Secret Product',
            'cost_price' => 10,
            'sale_price' => 20,
            'stock_qty' => 5,
        ]);

        $this->actingAs($userA)
            ->putJson("/api/products/{$productB->id}", ['name' => 'Hijacked'])
            ->assertStatus(404);

        $this->actingAs($userA)
            ->deleteJson("/api/products/{$productB->id}")
            ->assertStatus(404);

        $this->assertDatabaseHas('products', ['id' => $productB->id, 'name' => 'Secret Product']);
    }

    public function test_products_index_only_returns_the_authenticated_tenants_products(): void
    {
        $tenantA = Tenant::create(['name' => 'Tenant A', 'phone' => '111']);
        $tenantB = Tenant::create(['name' => 'Tenant B', 'phone' => '222']);
        $userA = $this->makeUser($tenantA, 'a@example.com');

        Product::create(['tenant_id' => $tenantA->id, 'name' => 'A Product', 'cost_price' => 10, 'sale_price' => 20, 'stock_qty' => 5]);
        Product::create(['tenant_id' => $tenantB->id, 'name' => 'B Product', 'cost_price' => 10, 'sale_price' => 20, 'stock_qty' => 5]);

        $response = $this->actingAs($userA)->getJson('/api/products');

        $response->assertOk()->assertJsonCount(1);
        $this->assertSame('A Product', $response->json('0.name'));
    }

    public function test_a_tenant_cannot_view_another_tenants_retailer(): void
    {
        $tenantA = Tenant::create(['name' => 'Tenant A', 'phone' => '111']);
        $tenantB = Tenant::create(['name' => 'Tenant B', 'phone' => '222']);
        $userA = $this->makeUser($tenantA, 'a@example.com');

        $retailerB = Retailer::create([
            'tenant_id' => $tenantB->id,
            'shop_name' => 'Secret Shop',
            'phone' => '0711111111',
            'location' => 'Nowhere',
        ]);

        $this->actingAs($userA)
            ->getJson("/api/retailers/{$retailerB->id}")
            ->assertStatus(404);
    }

    public function test_creating_a_product_via_api_is_scoped_to_the_authenticated_users_tenant(): void
    {
        $tenant = Tenant::create(['name' => 'Tenant A', 'phone' => '111']);
        $user = $this->makeUser($tenant, 'a@example.com');

        $this->actingAs($user)
            ->postJson('/api/products', [
                'name' => 'New Product',
                'cost_price' => 10,
                'sale_price' => 20,
                'stock_qty' => 5,
            ])
            ->assertStatus(201);

        $this->assertDatabaseHas('products', ['name' => 'New Product', 'tenant_id' => $tenant->id]);
    }
}
