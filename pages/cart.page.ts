import {Page} from '@playwright/test'
import UploadComponent from './component/upload.component.ts';

export default class CartPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    
    UploadComponent() {
        return new UploadComponent(this.page);
    }
}