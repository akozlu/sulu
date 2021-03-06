The `Toolbar` component serves as container for `Controls`. The `Controls` component groups components which provide
the user interaction like `Button`, `Toggler`, `Select` or `Dropdown`. Additionally the `Popover` component exists,
which shows a button that hides the return value of the `children` prop and shows it on a click.

```javascript
<Toolbar>
    <Toolbar.Controls>
        <Toolbar.Button onClick={() => null}>Test 1</Toolbar.Button>
        <Toolbar.Button onClick={() => null}>Test 2</Toolbar.Button>
    </Toolbar.Controls>
</Toolbar>
```

The space inside of the `Toolbar` will be divided fairly for all the `Controls` children. Inside of the `Controls`
component you can group the items by using the `Items` component.

```javascript
<Toolbar>
    <Toolbar.Controls>
        <Toolbar.Button onClick={() => null}>Test 1</Toolbar.Button>
        <Toolbar.Toggler
            disabled={true}
            onClick={() => null}
            label="Toggler"
            value={true}
        />
        <Toolbar.Items>
            <Toolbar.Button onClick={() => null}>Test 2</Toolbar.Button>
            <Toolbar.Dropdown
                label="Chose an option" 
                onClick={() => null}
                options={[
                    {
                        label: 'An option',
                        onClick: () => null,
                    },
                ]}
            />
        </Toolbar.Items>
    </Toolbar.Controls>
    <Toolbar.Controls>
        <Toolbar.Popover label="Show content">
            {() => 'Content'}
        </Toolbar.Popover>
        <Toolbar.Select 
            label="Chose an option" 
            onClick={() => null}
            options={[
                {
                    value: 1,
                    label: 'An option',
                },
            ]}
        />
    </Toolbar.Controls>
</Toolbar>
```

The appearance of the `Toolbar` can be changed by passing the attribute `skin`. Available skins are `light` and `dark`. 

```javascript
<Toolbar skin="dark">
    <Toolbar.Controls>
        <Toolbar.Toggler
            onClick={() => null}
            label="Toggler"
            value={false}
        />
        <Toolbar.Button onClick={() => null}>Test 1</Toolbar.Button>
        <Toolbar.Items>
            <Toolbar.Button onClick={() => null}>Test 2</Toolbar.Button>
            <Toolbar.Dropdown
                label="Chose an option" 
                onClick={() => null}
                options={[
                    {
                        label: 'An option',
                        onClick: () => null,
                    },
                ]}
            />
        </Toolbar.Items>
    </Toolbar.Controls>
    <Toolbar.Controls>
        <Toolbar.Popover label="Show content">
            {() => 'Content'}
        </Toolbar.Popover>
        <Toolbar.Select 
            label="Chose an option" 
            onClick={() => null}
            options={[
                {
                    value: 1,
                    label: 'An option',
                },
            ]}
        />
    </Toolbar.Controls>
</Toolbar>
```

It is also possible to show a success message.

```javascript
const [success, setSuccess] = React.useState(false);

const buttonClick = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
};

<Toolbar>
    <Toolbar.Controls>
        <Toolbar.Button onClick={buttonClick} success={success}>Cause success</Toolbar.Button>
    </Toolbar.Controls>
</Toolbar>
```
