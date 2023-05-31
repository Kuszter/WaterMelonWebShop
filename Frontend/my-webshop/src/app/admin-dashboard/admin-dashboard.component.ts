import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../api.service';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService, private apiService: ApiService) { }

  ngOnInit() {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']);
    }
    this.getProducts();
  }
  showAddProductForm: boolean = false;
  showEditProductForm: boolean = false;
  showDeleteProductConfirmation: boolean = false;
  selectedProduct: any = null;
  products: any[] = [];
  newProduct = {
    Name: "",
    Description: "",
    Price: 0,
    ImageUrl: ""
  }



  showAddProduct() {
    this.showAddProductForm = true;
  }
  showEditProduct() {
    this.showEditProductForm = true;
  }

  showDeleteProduct() {
    this.showDeleteProductConfirmation = true;
  }
  addProduct() {
    if (!this.authService.isAdmin()) {
      // Felhasználónak nincs admin jogosultsága
      console.log('User does not have admin privileges');
      return;
    }
    this.apiService.createProduct(this.newProduct).subscribe(
      (response) => {
        this.newProduct = {
          Name: "",
          Description: "",
          Price: 0,
          ImageUrl: ""
        };

        this.showAddProductForm = false;
        console.log('Product created successfully');
      },
      (error) => {

        console.error('Error adding product', error);
      }
    );
  }

  getProducts() {
    if (!this.authService.isAdmin()) {

      console.log('User does not have admin privileges');
      return;
    }
    this.apiService.getProducts().subscribe(
      (products: any[]) => {
        this.products = products;
      },
      (error) => {
        console.error('Error retrieving products', error);
      }
    );
  }
  cancelAddProduct() {
    this.showAddProductForm = false;
 

    this.newProduct = {
      Name: "",
      Description: "",
      Price: 0,
      ImageUrl: ""


    };
  }

  updateProduct() {
    this.apiService.getCategories().subscribe(
      (categories) => {
        this.selectedProduct.category = categories.find(c => c.id === this.selectedProduct.categoryId);

        this.apiService.updateProduct(this.selectedProduct.id, this.selectedProduct)
          .subscribe(
            (response) => {
              console.log('Product updated successfully');
              this.cancelEdit();
            },
            (error: any) => {
              console.error('Error updating product', error);
            }
          );
      },
      (error: any) => {
        console.error('Error fetching categories', error);
      }
    );
  }




  cancelEdit() {
    this.showEditProductForm = false;
    this.selectedProduct = null;
  }
  showEditForm(product: any) {
    this.selectedProduct = { ...product };
  }

  deleteProduct(productId: string) {
    if (!this.authService.isAdmin()) {
      // Felhasználónak nincs admin jogosultsága
      console.log('User does not have admin privileges');
      return;
    }
    this.apiService.deleteProduct(productId).subscribe(
      (response) => {
        // Sikeres törlés, kezelheted a választ itt
        console.log('Product deleted successfully');
        // További műveletek, például frissítheted a terméklistát
        this.getProducts(); // <-- Itt hívod meg újra a getProducts függvényt
        this.cancelDeleteProduct(); // Ha azt szeretnéd, hogy a törlés után ne legyen látható a törlés megerősítése, hívhatod ezt a függvényt is
      },
      (error) => {
        // Hiba történt, kezelheted az error objektumot itt
        console.error('Error deleting product', error);
      }
    );
  }


  cancelDeleteProduct() {
    this.showDeleteProductConfirmation = false;
  }
}
