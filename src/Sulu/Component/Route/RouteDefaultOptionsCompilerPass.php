<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Component\Route;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class RouteDefaultOptionsCompilerPass implements CompilerPassInterface
{
    /**
     * @var string
     */
    private $targetService;

    /**
     * @var string
     */
    private $targetDefaultOptionsArgument;

    /**
     * @param string $targetService
     * @param int $targetDefaultOptionsArgument
     */
    public function __construct($targetService, $targetDefaultOptionsArgument)
    {
        $this->targetService = $targetService;
        $this->targetDefaultOptionsArgument = $targetDefaultOptionsArgument;
    }

    public function process(ContainerBuilder $container)
    {
        if (!$container->hasDefinition('routing.loader')) {
            return;
        }

        if (!$container->hasDefinition('sulu_custom_urls.routing.provider')) {
            return;
        }

        // copy default route options which are set by the symfony FrameworkExtension based on the config:
        // https://github.com/symfony/symfony/pull/31900
        $routeDefaultOptions = $container->getDefinition('routing.loader')->getArgument(1);

        // symfony 4.4 passes the default options on index 2 instead of index 1
        $deprecatedRouteDefaultOptions = $container->getDefinition('routing.loader')->getArgument(2);
        if (\is_array($deprecatedRouteDefaultOptions) && isset($deprecatedRouteDefaultOptions['utf8'])) {
            $routeDefaultOptions = $deprecatedRouteDefaultOptions;
        }

        $container->getDefinition($this->targetService)->replaceArgument(
            $this->targetDefaultOptionsArgument,
            $routeDefaultOptions
        );
    }
}
