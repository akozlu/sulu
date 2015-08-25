<?php

/*
 * This file is part of the Sulu.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Component\Persistence\Repository\ORM;

use Doctrine\ORM\QueryBuilder;

trait OrderByTrait
{
    /**
     * Function adds order-by to querybuilder based on $sortBy-data given.
     *
     * @param QueryBuilder $queryBuilder
     * @param array $sortBy
     */
    private function addOrderBy(QueryBuilder $queryBuilder, $alias, $sortBy = [])
    {
        foreach ($sortBy as $field => $order) {

            // if no relation is defined add alias by default
            if (strpos('.', $field) !== false) {
                $field = $alias . '.' . $field;
            }

            $queryBuilder->addOrderBy($field, $order);
        }
    }
}
