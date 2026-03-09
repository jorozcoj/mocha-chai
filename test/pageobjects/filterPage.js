import BasePage from "./basePage.js";

class FilterPage extends BasePage {

    get categoryCheckboxes(){
        return $$('input[name="category_id]"')
    }

    categoryByName(name){
        return $(`//label[contains(normalize-space(),"${name}")]/input`)
    }

    async selectCategory(name) {
        const checkbox = await this.categoryByName(name);

        await checkbox.waitForClickable();

        if(!(await checkbox.isSelected())){
            await checkbox.click()
        }
    }

    async selectMultipleCategories(names){
        for(const name of names) {
            await this.selectCategory(name)
        }
    }

    async selectOnlyOne(name){
        const checkboxes = await this.categoryCheckboxes;

        for (const checkbox of checkboxes) {
            if(await checkbox.isSelected()){
                await checkbox.click()
            }            
        }
        await this.selectCategory(name)
    }

    async unselectCategory(name){
        const checkbox = await this.categoryByName(name);

        if( await checkbox.isSelected()){
            await checkbox.click()
        }
    }
}

export default new FilterPage ();