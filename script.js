let resize_actor = GURPS.LastActor;
if (!resize_actor) return ui.notifications.error("You must have an actor selected!");

setTimeout(async () => {
    new Dialog (
        {
            title: 'Large Token Resizer',
            content: '<form autocomplete="off" onsubmit="event.preventDefault();"><p class="notes">Enter Token Length</p><div class="form-group"><label for="data">Length</label><input type="text" name="data" data-dtype="Number"/></div></form>',
            buttons: {
                yes: {
                    icon: '<i class="fas fa-ruler"></i>',
                    label: 'Resize',
                    callback: html => {
                        const form = html.find('form')[0]
                        let resize_input = form.data.value;
                        if (isNaN(resize_input)) {
                            return ui.notifications.error("Input must be a number!");
                        } else {
                            resize_input = parseFloat(resize_input);
                            let new_value = resize_input*2 - 1;
                            if (resize_actor.isToken) {
                                resize_actor._findToken().update({"scale":new_value});
                            }
                            return resize_actor.update({"token.scale":new_value});
                        }
                    }
                },
                no: {
                    icon: '<i class="fas fa-times"></i>',
                    label: 'Cancel',
                },
            },
            default: 'yes',
        },
        {
            width: 400,
        }
    ).render(true)
}, 200);
